import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Widget} from '../models/widget.model';

import {AppStore} from '../models/appstore.model';

const BASE_URL = 'http://localhost:3000/widgets/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class WidgetsService {
  widgets: Observable<Widget[]> = this.store.select('widgets');

  constructor(private http: Http,
              private store: Store<AppStore>) {

    this.loadWidgets();
  }

  add(widget: Widget){
    return this.http.post(BASE_URL, JSON.stringify(widget), HEADER)
    .map(res => res.json())
    .map(payload => ({type: 'ADD_WIDGETS', payload}))
    .subscribe(action => {
      console.log('adding widget: ', action);
      this.store.dispatch(action);
    });
  }

  remove(widget: Widget){
    return this.http.delete(`${BASE_URL}${widget.id}`)
    .map(res => res.json())
    .map(payload => ({type: 'DELETE_WIDGETS', payload: widget}))
    .subscribe(action => this.store.dispatch(action));
  }

  update(widget: Widget){
    return this.http.put(`${BASE_URL}${widget.id}`, JSON.stringify(widget), HEADER)
    .map(res => res.json())
    .map(payload => ({type: 'UPDATE_WIDGETS', payload}))
    .subscribe(action => this.store.dispatch(action))
  }

  loadWidgets() {
    return this.http.get(BASE_URL)
      .map(res => res.json())
      .map(payload => ({ type: 'LOAD_WIDGETS', payload }))
      .subscribe(action => {
        console.log('i am loading the widgets: ', action);
        this.store.dispatch(action);
      })
  }
}
