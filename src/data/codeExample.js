export const codeParts = [
  { text: '<!-- seu primeiro código -->\n', className: 'text-muted' },
  { text: '<h1>', className: 'text-acc' },
  { text: 'Olá, mundo!', className: 'text-ink' },
  { text: '</h1>\n\n', className: 'text-acc' },
  { text: '<p>\n', className: 'text-acc' },
  { text: 'Minha primeira página\n', className: 'text-ink' },
  { text: '</p>', className: 'text-acc' },
]

export const fullCode = codeParts.map((part) => part.text).join('')
