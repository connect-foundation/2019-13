const mouseHandler = (set) =>{
  const mousedown = (e) => {
    e.preventDefault()
    let point = {}
    point.x = e.clientX - e.target.getBoundingClientRect().x
    point.y = e.clientY - e.target.getBoundingClientRect().y
    set({
      x: e.target.getBoundingClientRect().x,
      y: e.target.getBoundingClientRect().y
    });

    const mousemove = (e) => {
      e.preventDefault()
      set({
        x: e.clientX - point.x,
        y: e.clientY - point.y
      });
    };

    const mouseup = (e) => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  }
  return mousedown
}
export default mouseHandler