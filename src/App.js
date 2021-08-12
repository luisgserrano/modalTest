import "./styles.css";
import { useModal } from "./headless-modal";

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
    key: "details-billing-modal",
    modalComponent: NewModal,
    modalProps: { title: "Vamos ver se?" }
  });

  return (
    <button
      onClick={() =>
        showDetailsBilling({ newProps: { title: "billint details modal" } })
      }
    >
      mostra la isso
    </button>
  );
}

export default function App() {
  const { show } = useModal({
    key: "billing-modal",
    modalComponent: NewModal,
    modalProps: { title: "Vamos ver se resulta?" }
  });

  const { show: showEditBilling } = useModal({
    key: "edit-billing-modal",
    modalComponent: NewModal,
    modalProps: { title: "Edit billing details" }
  });

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={show}>mostra la isso</button>
      <button onClick={showEditBilling}>mostra la isso</button>
      <Nested />
    </div>
  );
}
