'use client'
import { useEffect } from 'react'
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'

interface KakaoMapProps {
  latitude: number
  longitude: number
  setCustomValue?: (id: string, value: number) => void
  detailPage?: boolean
}

const KakaoMap: React.FC<KakaoMapProps> = ({
  latitude,
  longitude,
  setCustomValue,
  detailPage = false,
}) => {
  const [_loading, _error] = useKakaoLoader({
    appkey: 'd77f148e757e708a19a199e532a4b16a',
  })
  const handleClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
    if (detailPage) return
    if (!setCustomValue) throw new Error('setCustomValue is not defined')
    setCustomValue('latitude', mouseEvent.latLng.getLat())
    setCustomValue('longitude', mouseEvent.latLng.getLng())
  }

  useEffect(() => {}, [])

  return (
    <div className='min-h-[10vh]'>
      {/* 내부적으로 loading을 감지합니다. */}
      <Map
        style={{ width: '100%', height: '360px' }}
        center={{ lat: latitude, lng: longitude }}
        onClick={(_t, mouseEvent) => handleClick(mouseEvent)}
      >
        <MapMarker position={{ lat: latitude, lng: longitude }} />
      </Map>
    </div>
  )
}
export default KakaoMap
