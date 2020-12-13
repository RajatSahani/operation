import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';
import styles from './Action.module.scss';
import SPOperation from '../../../Services/SPOperation'
import { IFieldsConfig } from '../../../Interface/IFieldsConfig'
import { CommandBarButton, Stack, IStackStyles, concatStyleSets } from 'office-ui-fabric-react';
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ProjectConstants } from '../../../Constants/ProjectConstants';

export interface IActionProps {
  kyes?: string[];
  id: number;
  listtitle: string;
}
export interface IActionState {
  commandbutton: IFieldsConfig[],
  hideDialog: boolean
}
const LOG_SOURCE: string = 'Action';

export default class Action extends React.Component<IActionProps, IActionState> {

  private stackStyles: Partial<IStackStyles> = { root: { height: 34 } };
  private _SPOperation: SPOperation;
  constructor(props: IActionProps) {
    super(props);
    this.state = {
      commandbutton: [],
      hideDialog: true
    }
    this._SPOperation = new SPOperation();
    console.log("constructor", props);
    this.Remove = this.Remove.bind(this);
  }
  private toggleHideDialog(hideDialog: boolean): void {
    this.setState({
      hideDialog: hideDialog
    })
  }

  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: Action mounted');
    if (this.props.kyes.length > 0) {
      this._SPOperation.getCommandButton(this.props.kyes, this.props.id).then((CommandButtons: IFieldsConfig[]) => {
        console.log(CommandButtons);
        this.setState({
          commandbutton: CommandButtons
        })
      })
    }
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: Action unmounted');
  }
  public Remove(): void {
    let listtitle: string = this.props.listtitle;
    let id: number = this.props.id;
    this._SPOperation.RecycleItem(listtitle, id).then((flag: boolean) => {
      this.toggleHideDialog(false);
    })

  }
  @override
  public render(): React.ReactElement<{}> {
    return (
      <div className={styles.cell}>

        <Stack horizontal styles={this.stackStyles} gap={5}>
          {this.state.commandbutton && this.state.commandbutton.map((item, i) => {
            console.log("render", item);
            return [
              <>
                <CommandBarButton iconProps={item.iconProps} text={item.text} href={item.IsRemove ? null : item.href} key={item.key} onClick={item.IsRemove ? () => this.toggleHideDialog(false) : () => { }} />
                <Dialog
                  hidden={this.state.hideDialog}
                  onDismiss={() => { this.toggleHideDialog(true) }}
                  dialogContentProps={ProjectConstants.dialogContentProps}
                  modalProps={ProjectConstants.modalProps}>
                  <DialogFooter>
                    <PrimaryButton onClick={() => { this.Remove() }} text="Delete" />
                    <DefaultButton onClick={() => { this.toggleHideDialog(true) }} text="Cancel" />
                  </DialogFooter>
                </Dialog>
              </>
            ]
          })}

        </Stack>

      </div>

    );
  }

}
