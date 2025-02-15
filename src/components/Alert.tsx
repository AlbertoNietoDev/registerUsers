import withReactContent from "sweetalert2-react-content";
import { renderToString } from "react-dom/server";
import ErrorIcon from "../assets/icons/ErrorIcon.gif";
import SuccessIcon from "../assets/icons/SuccessIcon.gif";
import WarningIcon from "../assets/icons/WarningIcon.gif";
import Swal from "sweetalert2";
import React from "react";

interface IAlert {
  props?: {
    icon?: IIconType;
    title?: string;
    text?: string;
    html?: string;
    okbtntext?: string;
    okbtnclass?: string;
  };
  successfn?: () => void;
  errorfn?: () => void;
}
interface IIconType {
    type: "error" | "success" | "warning";
}

const MySwal = withReactContent(Swal);

export const Alert = ({ props, successfn, errorfn }: IAlert) => {
  // console.log('props Alert ', props)
  return MySwal.fire({
    iconHtml: GetIconAlert(props?.icon ?? { type: "warning" }),
    title: props?.title,
    text: props?.text,
    html: props?.html,
    showClass: {
      icon: "swal2-icon-alertNoti",
    },
    confirmButtonText: props?.okbtntext ?? "Confirmar",
    customClass: {
      confirmButton: props?.okbtnclass ?? "confirmButtonSweet",
      container: "backdropSweet",
      title: "tituloNotificacion",
    },
  })
    .then(successfn)
    .catch(errorfn);
};

const GetIconAlert = (iconType: IIconType) => {
    switch (iconType.type) {
      case "error":
        return <img src={ErrorIcon} alt="IMGError" className="swal2-icon-content-img" /> 
      case 'success':
        return <img src={SuccessIcon} alt="IMGSuccess" className="swal2-icon-content-img" />
      default:
        return <img src={WarningIcon} alt="IMGWarning" className="swal2-icon-content-img" />
    }
  }