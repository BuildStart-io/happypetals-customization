const fs = require('fs');
const file = 'docker/docker-compose.override.yml';
let code = fs.readFileSync(file, 'utf8');

code += `
  waha:
    container_name: waha
    image: devlikeapro/waha
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      WHATSAPP_DEFAULT_ENGINE: NOWEB
      WAHA_API_KEY: \${WAHA_API_KEY}
`;

fs.writeFileSync(file, code);
