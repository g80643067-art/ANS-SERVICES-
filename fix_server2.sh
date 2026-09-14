sed -i 's/    console.log(`Server running on http:\/\/localhost:${PORT}`);/      console.log(`Server running on http:\/\/localhost:${PORT}`);/' server.ts
sed -i 's/  });/    });\n  }/' server.ts
