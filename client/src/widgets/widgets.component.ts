import { Widget } from './../common/models/widget.model';
import {selectedWidget} from '../common/stores/selectedWidget.store';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import {WidgetsService} from './../common/services/widgets.service';
import {WidgetsList} from './widgets-list.component';
import {WidgetDetails} from './widget-details.component';
import {AppStore} from '../common/models/appstore.model';

@Component({
  selector: 'widgets',
  template: `
    <h4>Fix my inputs and outputs!</h4>
    <div class='mdl-grid items'>
      <div class='mdl-cell mdl-cell--6-col'>
        <widgets-list [widgets]='widgets'
        (selected)='selectWidget($event)'
        (deleted)='deleteWidget($event)'></widgets-list>
      </div>
      <div class='mdl-cell mdl-cell--6-col'>
        <widget-details (saved)='saveWidget($event)'
        [widget]='selectedWidget | async'></widget-details>
      </div>
    </div>
  `,
  styles: [`
    .widgets {
      padding: 20px;
    }
  `],
  directives: [WidgetsList, WidgetDetails],
  providers: [WidgetsService]
})
export class Widgets implements OnInit {
  widgets: Widget[];
  selectedWidget;

  constructor(private _widgetsService: WidgetsService,
    private _store: Store<AppStore>) {
    this.selectedWidget = _store.select('selectedWidget');

  }

  resetWidget() {
    let emptyWidget: Widget = {id: null, name: '', price: null};
    this._store.dispatch({type: 'SELECT_WIDGET', payload: emptyWidget});
  }

  selectWidget(widget: Widget) {
    this._store.dispatch({type: 'SELECT_WIDGET', payload: widget});
  }

  deleteWidget(widget: Widget) {
    this._widgetsService.remove(widget);
  }

  saveWidget(widget: Widget) {
    console.log('widget: ', widget);
    (widget.id) ? this._widgetsService.update(widget) : this._widgetsService.add(widget);
    this.resetWidget();
  }

  ngOnInit() {
    this._widgetsService.widgets.subscribe(widgets => {
      console.log(widgets);
      this.widgets = widgets;
    }
   );
  }
}
