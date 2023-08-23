import { useRef } from "react"

export default function Calculator() {
  const admissionRef = useRef<any>(null);
  const resignationRef = useRef<any>(null);

  return (
    <section>
      <div className="calculator-header">
        <div className="position">
          <span></span>
          <div>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span id="delete-button">DEL</span>
          </div>
        </div>
      </div>
      <form>
        <div>
          <label htmlFor="admission-date">Data de Admissão</label>
          <input ref={admissionRef} type="date" name="admission-date" id="admission-date" />
        </div>
        <div>
          <label htmlFor="resignation-date">Data de Demissão</label>
          <input ref={resignationRef} type="date" name="resignation-date" id="resignation-date" />
        </div>
        <input type="submit" value="Calcular" />
      </form>
    </section>
  )
}