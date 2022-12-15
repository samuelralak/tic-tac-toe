import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { classNames } from '../utils'
import { fetchFromStorage, saveToStorage } from '../services/storage'
import PropTypes from 'prop-types'

export default function SaveHistory({ config, gameState }) {
  const [saving, setSaving] = useState(false)
  const [historyKey, setHistoryKey] = useState(null)
  const [history, setHistory] = useState({})
  const onSaveGame = () => {
    const data = {
      [Math.floor(Date.now() / 1000)]: { config, gameState },
    }

    setSaving(true)
    saveToStorage(data)
    setHistory(fetchFromStorage())

    setTimeout(() => {
      setSaving(false)
    }, 1500)
  }

  useEffect(() => {
    setHistory(fetchFromStorage())
  }, [])

  return (
    <>
      <div className="inline-flex rounded-md shadow-sm items-center">
        <button
          type="button"
          className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          onClick={onSaveGame}
        >
          Save history
        </button>
        <Menu as="div" className="relative -ml-px block">
          <Menu.Button className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
            <span className="sr-only">Open options</span>
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {Object.keys(history)
                  .reverse()
                  .map(key => (
                    <Menu.Item key={key}>
                      <button
                        onClick={() => setHistoryKey(key)}
                        className={classNames(
                          'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Load game {key}
                      </button>
                    </Menu.Item>
                  ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        {saving && (
          <span className="italic text-sm text-gray-600 ml-2 font-medium">
            Saving...
          </span>
        )}
      </div>
      {historyKey && (
        <div className="bg-gray-200 text-sm text-gray-600 ml-2 font-medium rounded-lg p-2.5 mt-2">
          {JSON.stringify(history[historyKey])}
        </div>
      )}
    </>
  )
}

SaveHistory.propTypes = {
  config: PropTypes.object.isRequired,
  gameState: PropTypes.array.isRequired,
}
