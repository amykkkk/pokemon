export default function InputBox(prop: any) {
  return (
    <div className={`form-wrap ${prop.name}`}>
      <label htmlFor={prop.id} className="form-label">
        {prop.name}
      </label>
      <input
        placeholder={prop.place}
        className="form-control"
        type={prop.type}
        id={prop.id}
        name={prop.name}
        value={prop.value}
        onChange={prop.onChange}
      />
      <small className="msg">{prop.errMsg}</small>
      {prop.children}
    </div>
  );
}
