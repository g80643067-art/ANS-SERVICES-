#!/bin/bash
# Remove the old startServer and add the export
sed -i 's/}//' server.ts # Wait, this is bad.
