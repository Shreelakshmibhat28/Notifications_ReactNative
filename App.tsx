import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

// Function to load components dynamically
const loadComponents = () => {
  const context = (require as any).context('./app', true, /\.tsx$/);
  const components: { [key: string]: any } = {};

  context.keys().forEach((key: string) => {
    const component = context(key);
    // Store the component in the components object
    components[key.replace('./', '').replace('.tsx', '')] = component.default || component;
  });

  return components;
};

export default function App() {
  const components = loadComponents();
  const context = (require as any).context('./app', true, /\.tsx$/);

  return <ExpoRoot context={context} />;
}

registerRootComponent(App);