> [🏠 Home](../../README.md)
> [🏠 Журнал изменений](../../CHANGELOG.md)

# Creating dispatcher

The dispatcher is needed to create a reactive state

```typescript
import { createDispatcher, loggerDispatcherMiddleware } from 'synapse-storage/reactive'
import { PokemonStorage } from '../storages/pokemon.storage'
import { createPokemonAlertMiddleware } from '../middlewares/pokenon.middlewares'
import { Pokemon } from '../types'

// const myWorker = new Worker('path-to-my-worker')

export interface AlertPayload {
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  duration?: number // Display duration in milliseconds
}

// Function to create dispatcher
export function createPokemonDispatcher(storage: PokemonStorage) {
  // Create middleware: logger
    const loggerMiddleware = loggerDispatcherMiddleware({
        collapsed: true, // Collapse groups in consoles for compactness
        colors: {
            title: '#3498db', // Custom blue color for header
        },
        duration: true,      // lead time
        diff: true,          // Show full status
        showFullState: true, // Показывать полное состояние
        // Custom interface translations
        translations: {
            action: '',
            changesCount: '',
            diff: '',
            duration: '',
            error: '',
            //...
        }
    })

  // Create middleware: alertM (just for example)
  const alertM = createPokemonAlertMiddleware()

  return createDispatcher({
    storage,
    middlewares: [loggerMiddleware, alertM],
  }, (storage, { createWatcher, createAction }) => ({
    // watchers
    watchCurrentId: createWatcher({
      type: 'watchCurrentId',
      selector: (state) => state.currentId,
      shouldTrigger: (prev, curr) => prev !== curr,
      notifyAfterSubscribe: false, // Only changes (default)
      meta: { description: 'Track current Pokemon changes' },
    }),

    // Watches user profile for synchronization
    watchUserProfile: createWatcher({
      type: 'watchUserProfile',
      selector: (state) => state.userProfile,
      shouldTrigger: (prev, curr) => JSON.stringify(prev) !== JSON.stringify(curr),
      notifyAfterSubscribe: true, // Emit on subscription for sync
      meta: { description: 'Synchronize profile between modules' },
    }),
    // Events
    loadPokemon: createAction<number, { id: number }>({...}),
    loadPokemonRequest: createAction<number, { id: number }>({...}),
    // Successful data retrieval
    success: createAction<{ data?: Pokemon}, { data?: Pokemon }>({...}, {
      // Memoization function (not tested yet)
      // memoize: (currentArgs: any[], previousArgs: any[], previousResult: any) => true,
      // Web worker for action execution (not tested yet)
      // worker: myWorker,
    }),
    failure: createAction<Error, { err: Error }>({...}),
    next: createAction<void, { id: number }>({...}),
    prev: createAction<void, { id: number }>({...}),
    showAlert: createAction<AlertPayload, void>({...}),
  }))
  // Alternative way to add:
  // .use(logger)
  // .use(alertM)
}

// Export dispatcher type
export type PokemonDispatcher = ReturnType<typeof createPokemonDispatcher>
```
___

## 📚 Navigation

- [🏠 Home](../../README.md)
- [📖 All documentation sections](../../README.md#-documentation)

### Related sections:
- [⚡ Creating Effects](./create-effects.md)
- [⚡ Creating Effects Module](./create-effects-module.md)
- [🛠️ createSynapse utility](./create-synapse.md)
- [⚙️ Creating custom middlewares](./custom-middlewares.md)
