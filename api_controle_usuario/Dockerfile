# Usa a imagem oficial do Node.js
FROM node:22.18.0

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Expõe a porta usada pelo app
EXPOSE 3000

# Comando para rodar o app
CMD ["node", "src/index.js"]
