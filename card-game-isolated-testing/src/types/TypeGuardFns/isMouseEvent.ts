export function isMouseEvent(event: Event): event is MouseEvent {
  return event instanceof MouseEvent;
}
