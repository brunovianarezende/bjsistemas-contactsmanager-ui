export const simulateClick = (vm, button) => {
  const clickEvent = new window.Event('click')
  button.dispatchEvent(clickEvent)
  vm._watcher.run()
}
