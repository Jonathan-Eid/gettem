import React, { FC, useRef, useCallback } from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import { InfoCircleFill } from 'react-bootstrap-icons'
import Markdown from 'react-markdown'
import { Carousel } from 'react-bootstrap'
import './SwipeCard.scss'
import { STRAPI_URL } from '../../api/strapi'
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useAnalytics } from '../../context/AnalyticsContext'


interface Props {
    card: any,
    variant?: 'swipe' | 'gallery',
    children?: any
}

const SwipeCard: FC<Props> = ({children, variant = 'swipe', ...props}) => {

  const [show, setShow] = React.useState(false);
  const { trackEvent, markTime, elapsed } = useAnalytics()
  const detailOpenTime = useRef<number>(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const maxScrollDepth = useRef<number>(0)

  const handleClose = () => {
    const cardId = String(props.card.id)
    trackEvent({
        eventType: 'detail_close',
        cardId,
        readTimeMs: elapsed(detailOpenTime.current),
        scrollDepth: Math.round(maxScrollDepth.current * 100) / 100,
    })
    maxScrollDepth.current = 0
    setShow(false)
  };
  const handleShow = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    detailOpenTime.current = markTime()
    trackEvent({
        eventType: 'detail_open',
        cardId: String(props.card.id),
    })
    setShow(true);
  }

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const depth = el.scrollHeight > el.clientHeight
        ? el.scrollTop / (el.scrollHeight - el.clientHeight)
        : 1
    if (depth > maxScrollDepth.current) {
        maxScrollDepth.current = depth
    }
  }, [])

  const card = props.card.attributes
  const card_images = card.images.data

  const imgSrc = (image: any) =>
    STRAPI_URL + (image.attributes.formats.large
      ? image.attributes.formats.large.url
      : image.attributes.url)

    return <>
            <Card className={`card-has-bg ${variant === 'gallery' ? 'card-gallery' : 'card-swipe'}`} text='white'>
              <Card.Img as={LazyLoadImage} wrapperClassName="effect" effect='blur' src={imgSrc(card_images[0])} />
              <Card.ImgOverlay></Card.ImgOverlay>
              <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: "end"}}>
                <Card.Subtitle className="mb-2">
                  {card.subtitle}
                </Card.Subtitle>
                <Card.Title className="mt-0">{card.name}</Card.Title>
                {variant !== 'gallery' && (
                  <Card.Text>
                    {card.intro}
                  </Card.Text>
                )}
                <button className={`details-icon-btn ${variant === 'gallery' ? 'details-icon-btn-gallery' : ''}`} onClick={handleShow} onTouchStart={(e) => e.stopPropagation()} onTouchEnd={handleShow} aria-label="View details">
                  <InfoCircleFill size={variant === 'gallery' ? 18 : 22} />
                </button>
              </Card.Body>
            </Card>

            <Modal dialogClassName="project-modal" show={show} onHide={handleClose} centered size="lg">
              <Modal.Body className="project-modal-body" ref={scrollRef} onScroll={handleScroll}>
                <button className="modal-close-btn" onClick={handleClose} aria-label="Close">
                  &times;
                </button>

                <div className="modal-carousel-section">
                  <Carousel className="project-carousel" interval={null}>
                    {card_images.map((image: any, i: number) => (
                      <Carousel.Item key={i}>
                        <LazyLoadImage
                          className="project-carousel-img"
                          src={imgSrc(image)}
                          effect='blur'
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>

                <div className="modal-info-section">
                  <span className="modal-subtitle">{card.subtitle}</span>
                  <h2 className="modal-title">{card.name}</h2>
                  <div className="modal-description">
                    <Markdown>{card.description}</Markdown>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            </>

}

export default SwipeCard
