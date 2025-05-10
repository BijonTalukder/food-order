export type IconType = "file" | "folder";

export interface BreadcrumbItem {
  title: string;
  path: string;
  icon?: JSX.Element;
  iconType?: IconType;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}
export type IStores= {
  _id:string,
  storeName?: string,
  imgUrl?: string;
  status?: string;
  pointLocation?: {
      storeAddress: string;
      type:string;
      coordinates: number[];     
  }
}