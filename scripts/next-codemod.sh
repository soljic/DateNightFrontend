#! /bin/bash

# links
npx @next/codemod@latest new-link ./pages
npx @next/codemod@latest new-link ./components

# images
# next/image -> next/legacy/image
npx @next/codemod@latest next-image-to-legacy-image ./pages
npx @next/codemod@latest next-image-to-legacy-image ./components


# fonts
npx @next/codemod@latest built-in-next-font
