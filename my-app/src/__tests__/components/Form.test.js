import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Form from '../../components/Form';
// ...

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
        const onSubmit = jest.fn()
        const { getByPlaceholderText, getByText } = render(<Form onSubmit={onSubmit} />);

        fireEvent.changeText(getByPlaceholderText('UserName'),'roots')
        fireEvent.changeText(getByPlaceholderText('Password'),'12345')

        fireEvent.press(getByText('Sign in'))

       
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // onSubmit.mock.calls[0][0] contains the first argument of the first call
        expect(onSubmit.mock.calls[0][0]).toEqual({
          name: 'roots',
          password: '12345',
        });
        // expect the onSubmit function to have been called once and with a correct first argument
      });
    });
  });
});