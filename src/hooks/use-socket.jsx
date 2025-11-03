import { useEffect } from 'react';
import { useSectorsCache } from './use-sectors-cache';
import { useDispatch } from 'react-redux';
import { uiActions } from '@/redux/slices/ui.slice';
import socket from '@/tools/socket.tool';

export function useSocket() {
  const sectorsCache = useSectorsCache();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSectorUpdate = (sectorId) => {
      // Ensure sectorId is a string before proceeding
      if (typeof sectorId !== 'string') {
        console.error('Received invalid sectorId from server:', sectorId);
        return;
      }
      console.log(`%cReceived sector update from server: ${sectorId}`, 'color: #ff9900');
      sectorsCache.del(sectorId);
      dispatch(uiActions.triggerRerender(sectorId));
    };

    socket.on('sector_updated', handleSectorUpdate);

    // Clean up the listener when the component unmounts
    return () => {
      socket.off('sector_updated', handleSectorUpdate);
    };
  }, [sectorsCache, dispatch]); // Dependency array ensures the effect runs only once
}