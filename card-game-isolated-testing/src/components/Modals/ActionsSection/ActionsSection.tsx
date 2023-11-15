import {
  ActionsSectionAction,
} from "../../../types/ModalTypes/ActionsSectionTypes";
import ActionSectionBtn from "../../Buttons/ActionSectionBtn/ActionSectionBtn";
import styles from "./styles.module.css";

interface ActionsSectionProps {
  actions: ActionsSectionAction[];
}

const ActionsSection = ({ actions }: ActionsSectionProps) => {
  return (
    <div className={styles.actionSectionContainer}>
      {actions.map((action: ActionsSectionAction) => (
        <ActionSectionBtn
          key={action.text}
          text={action.text}
          clickHandler={action.handler}
        />
      ))}
    </div>
  );
};

export default ActionsSection;
