import { DialogType } from "office-ui-fabric-react";
// import { useId, useBoolean } from '@uifabric/react-hooks';
// const titleAriaId:string= useId('dialogLabel');
// const subtitleAriaId:string=useId('subTextLabel');
export class ProjectConstants {
    public static FieldsConfig = "FieldsConfig";
    public static dialogContentProps = {
        type: DialogType.normal,
        title: 'Delete?',
        closeButtonAriaLabel: 'Cancel',
        subText: 'Are you sure you want to send this item to the site recycle bin?',
    };
    public static dialogStyles = { main: { maxWidth: 450 } };
    public static modalProps = {
        // titleAriaId:titleAriaId,
        // subtitleAriaId: subtitleAriaId,
        isBlocking: false,
        styles: ProjectConstants.dialogStyles,
    }


}