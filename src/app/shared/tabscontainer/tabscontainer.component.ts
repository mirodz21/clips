import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-tabscontainer',
  templateUrl: './tabscontainer.component.html',
  styleUrl: './tabscontainer.component.scss',
})
export class TabscontainerComponent implements AfterContentInit {
  @ContentChildren(TabsComponent) tabs: QueryList<TabsComponent> =
    new QueryList();

  ngAfterContentInit(): void {
    const activeTab = this.tabs?.filter((tab) => tab.active);
    if (!activeTab || activeTab.length === 0) {
      this.selectTab(this.tabs!.first);
    }
  }

  public selectTab(tab: TabsComponent) {
    this.tabs.forEach((tab) => (tab.active = false));
    tab.active = true;
    return false;
  }
}
