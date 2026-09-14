const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(
`          },
          });
  }
        const text = result.text;`, 
`          },
        });
        const text = result.text;`);
fs.writeFileSync('server.ts', code);
