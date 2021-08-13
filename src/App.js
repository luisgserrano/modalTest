import './styles.css';
import { useModal } from './headless-modal';

function NewModal({ close, title }) {
  return (
    <div>
      {title}
      <button onClick={close}>close me</button>
    </div>
  );
}

function Nested() {
  const { show: showDetailsBilling } = useModal({
    key: 'details-billing-modal',
    modalComponent: NewModal,
    modalProps: { title: 'Billing details' },
  });

  return (
    <button
      onClick={() =>
        showDetailsBilling({
          newProps: { title: 'Billing details modal override' },
        })
      }
    >
      show nested example
    </button>
  );
}

export default function App() {
  const { show } = useModal({
    key: 'billing-modal',
    modalComponent: NewModal,
    modalProps: { title: 'Delete payment' },
  });

  const { show: showEditBilling } = useModal({
    key: 'edit-billing-modal',
    modalComponent: NewModal,
    modalProps: { title: 'Edit billing details' },
  });

  return (
    <div className="App">
      <button onClick={show}>show example one</button>
      <button onClick={showEditBilling}>show example two</button>
      <Nested />
    </div>
  );
}
