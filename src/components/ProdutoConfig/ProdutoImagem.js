import React, { useState } from 'react';

const ProdutoImagem = () => {
  const [imagem, setImagem] = useState(null);

  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImagem(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      {imagem ? (
        <img src={imagem} alt="Imagem do Produto" />
      ) : (
        <div
          style={{
            width: '200px',
            height: '200px',
            backgroundColor: '#000',
          }}
        />
      )}
      <input type="file" onChange={handleImagemChange} />
    </div>
  );
};

export default ProdutoImagem;
