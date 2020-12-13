import { sp } from "@pnp/sp/presets/all";
import { IFieldsConfig } from '../Interface/IFieldsConfig'
import { ProjectConstants } from '../Constants/ProjectConstants'
import { keyframes } from "office-ui-fabric-react";

export default class SPOperation {

    private PrepareHref(href: string, id: string): string {
        let url = "";
        if (href != null) {
            let rawurl = new URL(href);

            const params = new URLSearchParams(rawurl.search);
            if (params.has('itemid')) {
                var UrlObj = new URL(href);
                UrlObj.searchParams.set('itemid', id);
                url = UrlObj.toString()

            }
            else {
                url = href;
            }
        }
        console.log(url);
        return url;

    }
    public RecycleItem(listtitle: string, id: number): Promise<boolean> {
        let flag: boolean = false;
        return new Promise<boolean>((resolve, rejet) => {
            let list = sp.web.lists.getByTitle(listtitle);
            list.items.getById(id).recycle().then(_ => {
                flag = true;
                resolve(flag);
            });
        })


    }
    public getCommandButton(Key: string[], itemid: any): Promise<IFieldsConfig[]> {
        let FieldsConfigColl: IFieldsConfig[] = [];
        let filter: string = "";
        Key.map((key, i) => {
            if (i == 0) {
                filter += `Key eq '${Key[i]}'`
            }
            else {
                filter += ` or Key eq '${Key[i]}'`
            }
        });
        console.log(filter);
        return new Promise<IFieldsConfig[]>(async (resolve, reject) => {
            sp.web.lists.getByTitle(ProjectConstants.FieldsConfig)
                .items.select("Key", "Text", "IconName", "Href", "IsRemove")
                // .filter("Emailid eq '"+emailid+"'")
                // .expand("Country")
                .filter(filter)
                .getAll().then((items: any[]) => {
                    console.log(items);
                    items.map((item) => {
                        FieldsConfigColl.push(
                            {
                                key: item.Key,
                                text: item.Text,
                                href: this.PrepareHref(item.Href, itemid),
                                iconProps: { iconName: item.IconName },
                                IsRemove: item.IsRemove

                            });

                    })
                    resolve(FieldsConfigColl)
                })
        })
    }
}
