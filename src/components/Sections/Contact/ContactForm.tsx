import {FC, memo, useCallback, useMemo, useState} from 'react';

import {contact} from '../../../data/data';
import {ContactType} from '../../../data/dataDef';

// The site is a static export with no backend, so the form hands the message to the visitor's
// email client via a pre-filled mailto: link instead of posting it anywhere.
const recipientHref = contact.items.find(({type}) => type === ContactType.Email)?.href ?? '';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: FC = memo(() => {
  const defaultData = useMemo(
    () => ({
      name: '',
      email: '',
      message: '',
    }),
    [],
  );

  const [data, setData] = useState<FormData>(defaultData);
  const [submitted, setSubmitted] = useState(false);

  const onChange = useCallback(
    <T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>): void => {
      const {name, value} = event.target;

      const fieldData: Partial<FormData> = {[name]: value};

      setData({...data, ...fieldData});
    },
    [data],
  );

  const handleSendMessage = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const subject = `Message from ${data.name} via stanleychueh.com`;
      const body = `${data.message}\n\n— ${data.name} (${data.email})`;
      window.location.href = `${recipientHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSubmitted(true);
    },
    [data],
  );

  const inputClasses =
    'bg-neutral-700 border-0 focus:border-0 focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-md placeholder:text-neutral-400 placeholder:text-sm text-neutral-200 text-sm';

  return (
    <form className="grid min-h-[320px] grid-cols-1 gap-y-4" method="POST" onSubmit={handleSendMessage}>
      <input className={inputClasses} name="name" onChange={onChange} placeholder="Name" required type="text" />
      <input
        autoComplete="email"
        className={inputClasses}
        name="email"
        onChange={onChange}
        placeholder="Email"
        required
        type="email"
      />
      <textarea
        className={inputClasses}
        maxLength={250}
        name="message"
        onChange={onChange}
        placeholder="Message"
        required
        rows={6}
      />
      <button
        aria-label="Submit contact form"
        className="w-max rounded-full border-2 border-orange-600 bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-md outline-none hover:bg-stone-800 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-stone-800"
        type="submit">
        Send Message
      </button>
      {submitted && (
        <p className="text-sm text-neutral-400">
          Your email app should open with this message ready to send. If it didn't, please email me directly at{' '}
          <a className="text-orange-400 hover:underline" href={recipientHref}>
            {recipientHref.replace('mailto:', '')}
          </a>
          .
        </p>
      )}
    </form>
  );
});

ContactForm.displayName = 'ContactForm';
export default ContactForm;
