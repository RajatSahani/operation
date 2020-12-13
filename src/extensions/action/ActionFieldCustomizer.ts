import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'ActionFieldCustomizerStrings';
import Action, { IActionProps } from './components/Action';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";

import {ILookUpField} from '../../Interface/ILookUpField'
/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IActionFieldCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = 'ActionFieldCustomizer';

export default class ActionFieldCustomizer
  extends BaseFieldCustomizer<IActionFieldCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, 'Activated ActionFieldCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(LOG_SOURCE, `The following string should be equal: "ActionFieldCustomizer" and "${strings.Title}"`);// other init code may be present

    this.SetUpPnp();

    return Promise.resolve();
  }
  private SetUpPnp(): void {
    sp.setup({
      spfxContext: this.context
    });
    
  }
  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    // Use this method to perform your custom cell rendering.
    //const text: string = `${this.properties.sampleText}: ${event.fieldValue}`;
    //console.log(event.listItem.fields)
    //console.log(event.listItem.getValueByName("Action"));
    let fields=event.listItem.fields;
    console.log(fields);
    let id=event.listItem.getValueByName("ID");
    console.log("ID...");
    console.log(id);
    console.log("LookUpExample...")
    let LookUpField=event.listItem.getValueByName("Action") as ILookUpField[];
    console.log(event.listItem.getValueByName("Action"));
   // let value = event.listItem.getValueByName("Action");

    //console.log("value", value);
    var Keys: string[]=[];


    //Keys = value[0].split(';').map(item => item.trim());
    //Keys = value;
    //console.log(Keys.length);
    //LookUpField.map((item)=>{Keys.push(item.lookupValue)})
    LookUpField.map((i)=>{
    
      console.log(i.lookupValue);
      Keys.push(i.lookupValue);
    })
      

    console.log("key", Keys)
    console.log("List Title", this.context.pageContext.list.title)
    const action: React.ReactElement<{}> =
      React.createElement(Action, { kyes: Keys,id:id,listtitle:this.context.pageContext.list.title } as IActionProps);

    ReactDOM.render(action, event.domElement);
  }

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
