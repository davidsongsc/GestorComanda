from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from datetime import datetime
from modelo.sqlite_dados import cursor, conn
from modelo.socket_dados import sio, app, eventlet
from terlog import terminal_log
from OpenSSL import SSL

app = Flask(__name__)
sio = SocketIO(app, cors_allowed_origins="*")  # Permitir todas as origens
CERT_FILE = 'certs/cert.pem'
KEY_FILE = 'certs/key.pem'

CORS(app)
context = SSL.Context(SSL.SSLv23_METHOD)
context.use_privatekey_file(KEY_FILE)
context.use_certificate_file(CERT_FILE)
LISTA_NOTIFICACAO = []


def run_api():

    @sio.on('dados_comanda')
    def dados_comanda(sid, data):
        cursor.execute(
            "SELECT operador FROM Comanda WHERE mesa = ?", (data[0],))
        operador = cursor.fetchone()

        if operador:
            sio.emit('autenticacao', {'success': True,
                                      'operador': operador[0], }, room=sid)
        else:
            sio.emit('autenticacao', {'success': False}, room=sid)

    @sio.on('consultar_relatorios')
    def consultar_relatorios(sid):
        cursor.execute("SELECT * FROM Relatorios")
        relatorios = cursor.fetchall()

        # Formatando os dados dos relatórios antes de enviar ao cliente
        formatted_relatorios = []
        for relatorio in relatorios:
            formatted_relatorios.append({
                'id': relatorio[0],
                'tipo_relatorio': relatorio[1],
                'tipo_ocorrencia': relatorio[2],
                'ocorrencia': relatorio[3],
                'texto': relatorio[4],
                'data_hora': relatorio[5],
                'responsavel': relatorio[6],
                'valor': relatorio[7]
            })

        # Emitir os dados dos relatórios para o cliente
        sio.emit('relatorios_encontrados', {
                 'relatorios': formatted_relatorios}, room=sid)

    @sio.on('consultar_venda')
    def consultar_vendas(sid):
        cursor.execute("SELECT * FROM Itens")
        relatorios = cursor.fetchall()

        # Formatando os dados dos relatórios antes de enviar ao cliente
        formatted_relatorios = []
        for relatorio in relatorios:
            formatted_relatorios.append({
                'id': relatorio[0],
                'comanda': relatorio[1],
                'produto': relatorio[2],
                'datahora': relatorio[7],
                'qtd': relatorio[14],
                'valor': relatorio[15],
                'status': relatorio[17],
                'operador': relatorio[18]
            })

        # Emitir os dados dos relatórios para o cliente
        sio.emit('vendas_encontrados', {
                 'venda': formatted_relatorios}, room=sid)

    @sio.on('inserir_pagamentos')
    def modificar_status_comanda_nova(sid, data):
        print('Registro Pagamento:')
        # Obter o ID da comanda e o novo status do objeto de dados recebido
        bandeira = data['id']
        valor = float(data['status'])
        comanda = int(data['status'])
        data_hora = datetime.now()  # Ano, mês, dia, hora, minuto, segundo
        # Inserir uma nova linha na tabela Comanda com o ID e o status fornecidos
        cursor.execute(
            "INSERT INTO Pagamento (bandeira, valor, comanda, datahora) VALUES (?, ?, ?, ?)", (bandeira, valor, comanda, data_hora))
        conn.commit()

        # Emitir o evento para informar ao cliente React que o status foi modificado com sucesso
        sio.emit('pagamentos_inseridos', {
            'status': 'ok'}, room=sid)

    @sio.on('consultar_pagamentos')
    def consultar_pagamentos(sid):
        cursor.execute("SELECT * FROM Pagamentos")
        pagamentos = cursor.fetchall()

        # Formatando os dados dos relatórios antes de enviar ao cliente
        formatted_pagamentos = []
        for relatorio in pagamentos:
            formatted_pagamentos.append({
                'id': relatorio[0],
                'bandeira': relatorio[1],
                'valor': relatorio[2],
                'comanda': relatorio[3],
                'datahora': relatorio[4]
            })

        # Emitir os dados dos relatórios para o cliente
        sio.emit('pagamentos_encontrados', {
                 'pagamentos': formatted_pagamentos}, room=sid)

    @sio.on('usuariodlogin')
    def dados_usuario(sid, data):
        try:

            cursor.execute(
                "SELECT Colaborador.*, auth_user.username FROM Colaborador JOIN auth_user ON Colaborador.usuario = auth_user.id WHERE Colaborador.senha = ?", (data['senha'],))
            colaborador = cursor.fetchone()

            if colaborador:
                terminal_log(colaborador, 'usuario')
                print(
                    f"'nivel': {colaborador[2]}, 'usuario': {colaborador[6]}, 'auth': {colaborador[3]}, 'restricoes': {colaborador[5]}'")
                sio.emit('autenticacao', {
                    'success': True, 'nivel': colaborador[2], 'usuario': colaborador[6], 'auth': colaborador[3], 'restricoes': colaborador[5]}, room=sid)
            else:
                sio.emit('autenticacao', {'success': False}, room=sid)
        except Exception as e:
            print("Erro durante a consulta ao banco de dados:", e)

            sio.emit('autenticacao', {'success': False}, room=sid)

    # define evento para obter dados das comandas
    @sio.on('get_comandas')
    def get_comandas(sid):
        # executa query no banco de dados para obter as comandas
        cursor.execute("SELECT * FROM Comanda")
        comandas = cursor.fetchall()
        comandas_dict = []
        # adiciona os itens em cada comanda
        for comanda in comandas:
            cursor.execute("SELECT * FROM Itens WHERE id = ?", (comanda[0],))
            itens = cursor.fetchall()
            comanda_dict = {
                "chave": comanda[2],
                "datahora": comanda[4],
                "id": comanda[0],
                "itens": [
                    {
                        "id": i[0],
                        "itens": i[1],
                        "produto_id": i[2],
                        "gorjeta": i[3],
                        "desconto": i[4],
                        "tipoproduto": i[5],
                        "avaliacao": i[6],
                        "datahora": i[7],
                        "combinac": i[8],
                        "combinag": i[9],
                        "grupo": i[10],
                        "grupoc": i[11],
                        "qtd": i[14],
                        "valor": i[15],
                        "nomeproduto": i[16]
                    } for i in itens],
                "mesa": comanda[2],
                "pagamento": comanda[6],
                "status": comanda[3],
                "atendente": comanda[7],
                "operacao": comanda[10],
                "cliente": comanda[11]

            }
            comandas_dict.append(comanda_dict)

        # envia as comandas com os itens para o cliente
        sio.emit('comandas', comandas_dict, room=sid)

    # define evento para obter dados das mesas
    @sio.on('get_mesas')
    def get_mesas(sid):
        # executa query no banco de dados para obter as mesas
        cursor.execute("SELECT mesa, status FROM comanda")
        mesas = cursor.fetchall()

        # converte resultado em dicionário e envia para o cliente
        mesas_dict = {}
        for mesa, status in mesas:
            mesas_dict[str(mesa)] = {"ocupada": True if status != 0 else False}

        # adiciona as mesas que estão vazias
        for i in range(1, 67):
            if str(i) not in mesas_dict:
                mesas_dict[str(i)] = {"ocupada": False}

        sio.emit('mesas', mesas_dict, room=sid)

    @sio.on('modificar_status_comanda')
    def modificar_status_comanda(sid, data):
        # Obter o ID da comanda e o novo status do objeto de dados recebido
        comanda_id = data['id']
        novo_status = data['status']
        operacao = data['operacao']
        data_hora = datetime.now()  # Ano, mês, dia, hora, minuto, segundo
        # Atualizar o status da comanda no banco de dados
        cursor.execute(
            "UPDATE Comanda SET status = ?, udatahora = ?, operacao = ? WHERE chave = ?", (novo_status, data_hora, operacao, comanda_id))
        conn.commit()

        # Emitir o evento para informar ao cliente React que o status foi modificado com sucesso
        sio.emit('status_comanda_modificado', {
                 'id': comanda_id, 'status': novo_status}, room=sid)

    @sio.on('modificar_status_comanda_nova')
    def modificar_status_comanda_nova(sid, data):
        print('Modificar Comanda:')
        # Obter o ID da comanda e o novo status do objeto de dados recebido
        comanda_id = data['id']
        novo_status = int(data['status'])
        atendente = data['atendente']
        operacao = data['operacao']
        cliente = None
        if data['cliente']:
            cliente = data['cliente']
        data_hora = datetime.now()  # Ano, mês, dia, hora, minuto, segundo
        # Inserir uma nova linha na tabela Comanda com o ID e o status fornecidos
        cursor.execute(
            "INSERT INTO Comanda (chave, mesa, status, datahora, itens, operador, gorjeta, operacao, cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", (comanda_id, comanda_id, novo_status, data_hora, comanda_id, atendente, 0.10, operacao, cliente))
        conn.commit()

        # Emitir o evento para informar ao cliente React que o status foi modificado com sucesso
        sio.emit('status_comanda_modificado', {
            'id': comanda_id, 'status': novo_status}, room=sid)

    @sio.on('deletar_item_comanda')
    def deletar_item_comanda(sid, item_id):
        print('Deletar Item:', item_id)
        data_hora = datetime.now()  # Ano, mês, dia, hora, minuto, segundo
        # Defina o tipo de relatório para cancelamento (por exemplo, 1)
        tipo_relatorio = 1
        # Defina o tipo de ocorrência para cancelamento (por exemplo, 1)
        tipo_ocorrencia = 1
        # Descrição da ocorrência de cancelamento
        ocorrencia = 'Remover desconto'
        # Informações adicionais do cancelamento
        texto = 'item removido: {}'.format(item_id['nomesis'])
        responsavel = item_id['atendente']
        valor = item_id['valor']

        cursor.execute("DELETE FROM itens WHERE itens = ? AND produto = ?",
                       (item_id['comanda'], item_id['produto']))
        conn.commit()

        # Executar a instrução de DELETE para remover o item da comanda
        cursor.execute(
            "INSERT INTO Relatorios (tipo_relatorio, tipo_ocorrencia, ocorrencia, texto, datahora, responsavel, valor) VALUES (?, ?, ?, ?,?, ?, ?)",
            (tipo_relatorio, tipo_ocorrencia, ocorrencia,
             texto, data_hora, responsavel, valor)
        )
        conn.commit()

        # Emitir o evento para informar ao cliente React que o item foi deletado com sucesso
        sio.emit('item_comanda_deletado', {
            'comanda': item_id['comanda'], 'produto': item_id['produto']}, room=sid)

    @sio.on('anotar_item_comanda')
    def modificar_item_comanda(sid, data, id, operador):

        for item in data:
            item_id = id
            nome_produto = item['id']
            nome_fantasia = item['nomefantasia']
            valor = item['valor']
            descricao = item['descricao']
            avaliacao = item['avaliacao']
            disponibilidade = item['disponibilidade']
            quantidade = item['qtd']
            grupo = item['grupo']
            grupo_c = item['grupoc']
            combina_g = item['combinag']
            combina_c = item['combinac']

            # Executar a instrução de INSERT para inserir o item na tabela "itens"
            if item['status'] == 1:

                cursor.execute("""
                    INSERT INTO itens (itens, produto, gorjeta, desconto, tipoproduto, avaliacao, datahora, combinac, combinag, descricao, disponibilidade, grupo, grupoc, qtd, valor, nomefantasia, Operador)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (item_id, nome_produto, 0, 0, '', avaliacao, datetime.now(), combina_c, combina_g, descricao, disponibilidade, grupo, grupo_c, quantidade, valor, nome_fantasia, operador))
                conn.commit()
        print(f'Modificar Itens: {data} {id} {operador}')
        # Emitir o evento para informar ao cliente React que o status foi modificado com sucesso
        sio.emit('status_comanda_modificado', {
            'id': id, 'status': 3}, room=sid)

    @sio.on('modificar_gorjeta_comanda')
    def modificar_gorjeta_comanda(sid, data):
        # Obter o ID da comanda e o novo status do objeto de dados recebido
        comanda_id = data['id']
        gorjeta = data['gorjeta']
        data_hora = datetime.now()  # Ano, mês, dia, hora, minuto, segundo
        # Atualizar o status da comanda no banco de dados
        cursor.execute(
            "UPDATE Comanda SET gorjeta = ?, udatahora = ? WHERE chave = ?", (gorjeta, data_hora, comanda_id))
        conn.commit()

        # Emitir o evento para informar ao cliente React que o status foi modificado com sucesso
        sio.emit('status_comanda_modificado', {
                 'id': comanda_id, 'gorjeta': gorjeta}, room=sid)

    @sio.on('deletar_status_comanda_nova')
    def deletar_status_comanda_nova(sid, data):
        print('Deletar Comanda')
        comanda_id = data['id']
        novo_status = 0
        data_hora = datetime.now()  # Ano, mês, dia, hora, minuto, segundo

        cursor.execute("DELETE FROM Comanda WHERE chave = ?", (comanda_id,))
        conn.commit()

        cursor.execute("DELETE FROM Itens WHERE itens = ?", (comanda_id,))
        conn.commit()

        # Defina o tipo de relatório para cancelamento (por exemplo, 1)
        tipo_relatorio = 1
        # Defina o tipo de ocorrência para cancelamento (por exemplo, 1)
        tipo_ocorrencia = 1
        # Descrição da ocorrência de cancelamento
        ocorrencia = 'Cancelamento de comanda'
        # Informações adicionais do cancelamento
        texto = 'Comanda cancelada: {}'.format(comanda_id)
        responsavel = data['atendente']
        valor = data['valor']

        cursor.execute(
            "INSERT INTO Relatorios (tipo_relatorio, tipo_ocorrencia, ocorrencia, texto, datahora, responsavel, valor) VALUES (?, ?, ?, ?,?, ?, ?)",
            (tipo_relatorio, tipo_ocorrencia, ocorrencia,
             texto, data_hora, responsavel, valor)
        )
        conn.commit()
        # Emitir o evento para informar ao cliente React que o status foi modificado com sucesso
        sio.emit('status_comanda_modificado', {
                 'id': comanda_id, 'status': novo_status}, room=sid)

    @sio.on('notificacoes')
    def notificacoes(sid, data):
        print('Notificações')
        print(data)

        sio.emit('notificacoes_rec', data, room=sid)

    def update_data():
        while True:
            # atualiza os dados das comandas e mesas
            get_comandas(None)
            # aguarda 5 segundos antes de atualizar no  vamente

            eventlet.sleep(0.5)

    # inicia a atualização dos dados em um novo thread
    eventlet.spawn(update_data)

    if __name__ == '__main__':
        eventlet.wsgi.server(eventlet.wrap_ssl(eventlet.listen(
            ('', 8010)), certfile=CERT_FILE, keyfile=KEY_FILE, server_side=True), app)


run_api()
