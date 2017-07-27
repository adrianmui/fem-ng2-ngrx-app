const ADD_WIDGETS = 'ADD_WIDGETS';
const LOAD_WIDGETS = 'LOAD_WIDGETS';
const DELETE_WIDGETS = 'DELETE_WIDGETS';
const UPDATE_WIDGETS = 'UPDATE_WIDGETS';

export const widgets = (state: any = [], {type, payload}) => {
  switch (type) {
    case LOAD_WIDGETS:
      return payload;
    case ADD_WIDGETS:
      return state.concat(payload);
    case DELETE_WIDGETS:
      return state.filter(widget => widget.id !== payload.id);
    case UPDATE_WIDGETS:
      return state.map(widget => (widget.id === payload.id) ? Object.assign({}, widget, payload) : widget);
    default:
    console.log('default')
      return state;
  }
}
