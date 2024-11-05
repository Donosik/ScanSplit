import { services } from '@frontend/services';

export default function App() {
  return (
    <div>
      <h1>
        <span> Hello there, </span>
        {services()}
      </h1>
    </div>
  );
}
