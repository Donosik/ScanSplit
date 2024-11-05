import { test } from '@frontend/providers';

export default function App() {
  return (
    <div>
      <h1>
        <span> Hello there, </span>
        {test()}
      </h1>
    </div>
  );
}
