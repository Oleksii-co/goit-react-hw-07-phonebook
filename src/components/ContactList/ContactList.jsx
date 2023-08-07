import { useDispatch, useSelector } from 'react-redux';
import contactList from './ContactList.module.css';
import { deleteContact } from 'redux/contactsSlice';

const ContactList = () => {
  const contactData = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);

  const filterContacts = contactData.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });
  const dispatch = useDispatch();

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ol className={contactList.contactList}>
      {filterContacts.map(({ id, tel, name }) => {
        return (
          <li key={id}>
            {name}: {tel}
            <button type="button" onClick={() => onDeleteContact(id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ol>
  );
};

export default ContactList;

// ContactList.propTypes = {
//   deleteContact: PropTypes.func,
// };
