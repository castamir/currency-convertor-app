import '@testing-library/jest-dom';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/setup/setup';
import React from 'react';
import { ConverterForm } from './ConverterForm';

async function selectOption(
  user: UserEvent,
  fieldLabel: string,
  option: string
) {
  const currencyFromEl = await screen.findByLabelText(fieldLabel);
  await user.click(currencyFromEl);

  const currencyFromOptions = await screen.findByRole('listbox', {
    name: fieldLabel,
  });
  await user.click(within(currencyFromOptions).getByText(option));
}

describe('ConverterForm', () => {
  it('should select currencies and trigger convert action', async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();

    render(
      <ConverterForm
        currencies={[
          { value: 'USD' },
          { value: 'EUR' },
          { value: 'CZK' },
          { value: 'GBP' },
        ]}
        onConvert={handleSubmit}
      />
    );

    await selectOption(user, 'Currency from', 'EUR');
    await selectOption(user, 'Currency to', 'CZK');
    await user.type(screen.getByLabelText('Amount'), '10');

    await user.click(screen.getByRole('button', { name: /Convert/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        currencyFrom: 'EUR',
        currencyTo: 'CZK',
        amount: 10,
      })
    );
  });
});
