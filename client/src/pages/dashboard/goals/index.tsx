import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { updateStepCompletion } from "../../../store/actions/goalAction";

export default function Index() {
  const goals = useSelector((state) => state.goals.steps);
  const dispatch = useDispatch();

  const handleCheckboxChange = (index) => {
    dispatch(
      updateStepCompletion({ index, completed: !goals[index].completed })
    );
  };

  return (
    <div className="p-10">
      <h1 className="font-Geist text-xl font-semibold">Goals</h1>
      <div>
        <p className="pt-2">3/7 Completed</p>
      </div>
      <ul className="py-4">
        {goals.map((goal, index) => (
          <div key={index} className="flex items-center gap-2">
            <Checkbox
              checked={goal.completed}
              onCheckedChange={() => handleCheckboxChange(index)}
            />
            <li>{goal.step}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}
