const Header = require('../src/components/Header');

describe('Componente Header', () => {
  test('debe recibir el título como prop', () => {
    const title = 'Título de prueba';
    const el = Header({ title });
    expect(el.textContent).toBe(title);
  });

  test('debe recibir título y color como props', () => {
    const title = 'Otro título';
    const color = 'red';
    const el = Header({ title, color });
    expect(el.textContent).toBe(title);
    expect(el.style.color).toBe(color);
  });
});
