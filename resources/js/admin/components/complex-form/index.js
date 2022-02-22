import React from "react";
import Wizard from "$admin/ui-components/Wizard/Wizard";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";

export default ({complex, onFinishButtonClick}) => {
  return (
    <Wizard
      validate
      steps={[
        {stepName: "Адрес", stepComponent: Step2, stepId: "address"},
        {stepName: "Основное", stepComponent: Step1, stepId: "base"},
        {stepName: "Характеристики", stepComponent: Step3, stepId: "characteristics"},
        {stepName: "Инфаструктура", stepComponent: Step4, stepId: "infrastructure"},
      ]}
      globalProp={complex}
      title="Build Realty"
      finishButtonClick={onFinishButtonClick}
    >
    </Wizard>
  );
}
