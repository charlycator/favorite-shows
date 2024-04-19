import { useState } from 'react';

import {
  BookmarksProvider,
  ShowProvider,
} from '../../providers';
import { Tabs } from '../../lib/enums.ts';
import SearchShowView from '../search-show';
import BookmarksView from '../bookmarks';

import './index.css';


function MainView() {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.SEARCH);

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:px-8">
        <div
          role="tablist"
          className="tabs tabs-bordered">
          <a
            onClick={() => setActiveTab(Tabs.SEARCH)}
            role="tab"
            className={`tab ${activeTab === Tabs.SEARCH ? 'tab-active font-bold' : 'font-light'}`}>
            {Tabs.SEARCH}
          </a>
          <a
            onClick={() => setActiveTab(Tabs.BOOKMARKS)}
            role="tab"
            className={`tab ${activeTab === Tabs.BOOKMARKS ? 'tab-active font-bold' : 'font-light'}`}>
            {Tabs.BOOKMARKS}
          </a>
        </div>
        <div className="flex flex-col items-center my-12">
          <div className="w-2/3 min-w-[300px]">
            <ShowProvider>
              <BookmarksProvider>
                {activeTab === Tabs.SEARCH ? <SearchShowView /> : <BookmarksView />}
              </BookmarksProvider>
            </ShowProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainView;