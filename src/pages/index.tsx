import { FormEvent, useRef, useState } from "react";

class WorkDaysCalculator {
  private admissionDate: number;
  private resignationDate: number;

  constructor(admissionDate: number, resignationDate: number) {
    this.admissionDate = admissionDate;
    this.resignationDate = resignationDate;
  }

  calculateWorkDays(): number | string {
    const start = new Date(this.admissionDate);
    const end = new Date(this.resignationDate);

    if (end < start) {
      return "Não é permitido a data do demissão ser menor que a de admissão!";
    }

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Milliseconds in a day
    const differenceInDays = Math.round(
      (end.getTime() - start.getTime() + 1) / oneDayInMilliseconds
    );
    return differenceInDays + 1;
  }
}

class SalaryCalculator {
  private workDays: number | any;
  private hourlyRate: number;
  private hoursPerDay: number;

  constructor(workDays: string | number) {
    this.workDays = workDays;
    this.hourlyRate = 12.5;
    this.hoursPerDay = 8;
  }

  calculateTotalSalary(): number {
    const totalSalary = this.workDays * this.hoursPerDay * this.hourlyRate;
    return totalSalary;
  }
}

export default function Calculator() {
  const admissionRef = useRef<any>(null);
  const resignationRef = useRef<any>(null);

  const [workDays, setWorkDays] = useState<number | string>();
  const [totalSalary, setTotalSalary] = useState<number>();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const admissionDate = admissionRef.current.value;
    const resignationDate = resignationRef.current.value;

    const workDaysCalculator = new WorkDaysCalculator(
      admissionDate,
      resignationDate
    );
    const calculatedWorkDays = workDaysCalculator.calculateWorkDays();

    if (typeof calculatedWorkDays === "number") {
      const salaryCalculator = new SalaryCalculator(calculatedWorkDays);
      const calculatedSalary = salaryCalculator.calculateTotalSalary();
      setTotalSalary(calculatedSalary);
    }

    setWorkDays(calculatedWorkDays);
  };

  return (
    <section>
      <div className="calculator-header">
        <div className="position">
          <div>
            {typeof workDays === "number" ? (
              <>
                {workDays && (
                  <span>
                    <b>Dias Trabalhados:</b>
                    {workDays}
                  </span>
                )}
                {totalSalary && (
                  <span>
                    <b>Salário:</b>
                    {totalSalary}
                  </span>
                )}
              </>
            ) : (
              <span>{workDays}</span>
            )}
          </div>
          <div>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span id="delete-button">DEL</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="admission-date">Data de Admissão</label>
          <input
            ref={admissionRef}
            type="date"
            name="admission-date"
            id="admission-date"
            required
          />
        </div>
        <div>
          <label htmlFor="resignation-date">Data de Demissão</label>
          <input
            ref={resignationRef}
            type="date"
            name="resignation-date"
            id="resignation-date"
            required
          />
        </div>
        <input type="submit" value="Calcular" />
      </form>
    </section>
  );
}
