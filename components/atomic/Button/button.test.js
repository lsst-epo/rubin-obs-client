import { render, screen } from '@testing-library/react'
import Button from '@/atomic/Button';

const text = "Stuff and Things";
const children = <span>{text}</span>;

describe('Button', () => {

  it('renders text', () => {
    render(<Button>{children}</Button>);

    const buttonText = screen.getByRole('button', {
      name: text,
    });

    expect(buttonText).toBeInTheDocument();
  })
  
  // it('renders text', () => {
  //   render(<Button>{children}</Button>);

  //   const buttonText = screen.getByRole('button', {
  //     name: text,
  //   });

  //   expect(buttonText).toBeInTheDocument();
  // })
})