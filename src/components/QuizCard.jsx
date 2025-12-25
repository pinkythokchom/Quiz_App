import { Card, CardHeader, CardContent } from "./ui/card";

const QuizCard = ({ question, children }) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">{question}</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default QuizCard;
