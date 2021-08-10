# zustand-global-store

Store example:
```typescript
interface MyStoreState {
  counter: number;
}

export class MyStore extends BaseStore<MyStoreState> {
  static storeName = "MyStore";

  constructor(initialData: MyStoreState) {
    super(initialData, { counter: 1 });
  }

  inc = () => this.setState((state) => ({ counter: state.counter + 1 }));
  reset = () => this.setState({ counter: 1 });
}
```

Using hooks:

```tsx
const MyComponent = () => {
  const [{ counter }] = useStatefullStore(MyStore, ["counter"]);

  return <strong>{counter}</strong>
}

let rerenders = 0;

const MyApp = () => {
  const myStore = useStatelessStore(MyStore);
  
  return (
    <div>
      {++rerenders}
      <MyComponent />
      
      <button onClick={myStore.inc}>+</button>
      <button onClick={myStore.reset}>reset</button>
    </div>
  );
}
```

Making use of `useStatelessStore` hook does not cause a rerender on each store state update and its purpose is to be used only when we need to access a store methods. On the other hand, `useStatefullStore` accepts as second argument an array of the store properties on which zustand will trigger a rerender. 
