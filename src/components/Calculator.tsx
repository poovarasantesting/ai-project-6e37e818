import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { Divide, Minus, Plus, X } from "lucide-react";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [operator, setOperator] = useState<string | null>(null);
  const { toast } = useToast();

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
    setOperator(null);
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation(operator, firstOperand, inputValue);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = (
    op: string,
    first: number,
    second: number
  ): number => {
    switch (op) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        if (second === 0) {
          toast({
            title: "Error",
            description: "Cannot divide by zero",
            variant: "destructive",
          });
          return first;
        }
        return first / second;
      default:
        return second;
    }
  };

  const calculateResult = () => {
    if (firstOperand === null || operator === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const result = performCalculation(operator, firstOperand, inputValue);
    setDisplay(String(result));
    setFirstOperand(result);
    setWaitingForSecondOperand(true);
    setOperator(null);
  };

  const deleteLastDigit = () => {
    if (display.length > 1) {
      setDisplay(display.substring(0, display.length - 1));
    } else {
      setDisplay("0");
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-center">Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          className="text-right text-2xl mb-4 h-16"
          value={display}
          readOnly
        />

        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="outline"
            onClick={clearDisplay}
            className="col-span-2"
          >
            Clear
          </Button>
          <Button variant="outline" onClick={deleteLastDigit}>
            DEL
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleOperator("/")}
            className="text-xl"
          >
            <Divide size={20} />
          </Button>

          <Button variant="outline" onClick={() => inputDigit("7")}>
            7
          </Button>
          <Button variant="outline" onClick={() => inputDigit("8")}>
            8
          </Button>
          <Button variant="outline" onClick={() => inputDigit("9")}>
            9
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleOperator("*")}
            className="text-xl"
          >
            <X size={20} />
          </Button>

          <Button variant="outline" onClick={() => inputDigit("4")}>
            4
          </Button>
          <Button variant="outline" onClick={() => inputDigit("5")}>
            5
          </Button>
          <Button variant="outline" onClick={() => inputDigit("6")}>
            6
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleOperator("-")}
            className="text-xl"
          >
            <Minus size={20} />
          </Button>

          <Button variant="outline" onClick={() => inputDigit("1")}>
            1
          </Button>
          <Button variant="outline" onClick={() => inputDigit("2")}>
            2
          </Button>
          <Button variant="outline" onClick={() => inputDigit("3")}>
            3
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleOperator("+")}
            className="text-xl"
          >
            <Plus size={20} />
          </Button>

          <Button
            variant="outline"
            onClick={() => inputDigit("0")}
            className="col-span-2"
          >
            0
          </Button>
          <Button variant="outline" onClick={inputDecimal}>
            .
          </Button>
          <Button
            variant="default"
            onClick={calculateResult}
            className="bg-primary text-white"
          >
            =
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}