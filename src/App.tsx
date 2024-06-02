import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import './App.css'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { ImageGallery } from './types/global.types'
import { initialImageData } from './data'
import ImageCard from './components/Cards/ImageCard'
import Modal from './components/Modal'
import { nanoid } from 'nanoid'
import ImageOverlayCard from './components/Cards/ImageOverlayCard'


function App() {

  const [galleryDate , setGalleryDate] = useState (initialImageData);
  const [activeItem , setActveItem] = useState<ImageGallery | null>(null);
  const [counter , setCunter] = useState<number>();

  //handleDeleteItem

  const handleDeleteItem = () => {
    const newGallery =  galleryDate.filter(item => item.isSelected !== true)
    setGalleryDate(newGallery)
  }

  //handleDeleteItem end


  //counter for active items

  useEffect(()=>{
    counterFunction()
  },[galleryDate])

  const counterFunction = () : void => {
    let count : number = 0 
    galleryDate.forEach(item => {

      if(item.isSelected === true) count+=1

    })
    setCunter(count)
  }

  //counter for active items end

  // handle Add Image 

  const handleAddImage = (url : string) : void => {
    const newData = {
      id: nanoid(),
      slug:url,
      isSelected: false
    }
    setGalleryDate((prev)=>[...prev ,  newData])
  }

  // handle Add Image end

  // handleSelectImage


  const handleSelectImage = (id : number | string) : void => {
    const newGalleryData = galleryDate.map(imageItem => {
      if(imageItem.id === id){
        return {
          ...imageItem , isSelected : !imageItem.isSelected
        }
      }
      return imageItem
    })

    setGalleryDate(newGalleryData)
  }

   // handleSelectImage end


  // dnd code 


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor , {
      coordinateGetter : sortableKeyboardCoordinates
    }),
    useSensor(TouchSensor)
  )

  const handleDragStart = (event : DragStartEvent) => {
    const {id} = event.active;
    if (!id) return;
    const currentItem = galleryDate.find((item)=> item.id === id);
    setActveItem(currentItem || null)
  }

  const handleDragEnd = (event : DragEndEvent) => {
    setActveItem(null);
    const {active , over} = event;
    if (!over) return
    if (active.id !== over.id){
      setGalleryDate((items)=>{
        const oldIndex = items.findIndex((item)=> item.id === active.id);
        const newIndex = items.findIndex((item)=> item.id === over.id);
        return arrayMove(items , oldIndex , newIndex)
      })
    }
  }


  // dnd code end

  return (
    <>
      <div className='min-h-screen'>
        <div className='container flex flex-col items-center'>
          <div className='bg-white my-8 rounded-lg shadow max-w-5xl grid divide-y'>
            <header className=' px-8 py-2 flex justify-between items-center'>
              <h3 className='text-2xl'>Show Case</h3>
              {
                counter ? <button onClick={handleDeleteItem} className='bg-red-600 text-white rounded-lg py-2 px-4'>{`Delete ${counter} Item`}</button> : null  
              }
            </header>

            <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 p-8">
                <SortableContext items={galleryDate} strategy={rectSortingStrategy}>
                  {
                    galleryDate.map((imageItem)=>{
                      return (
                        <ImageCard  slug={imageItem.slug} id={imageItem.id} isSelected={imageItem.isSelected} onClick={handleSelectImage} />
                      )
                    })
                  }
                </SortableContext>

                
                <Modal handleAddImage={handleAddImage} />  

                <DragOverlay adjustScale={true} wrapperElement='div' >
                  {
                    activeItem ? (
                      <ImageOverlayCard className='absolute z-50 h-full w-full' slug={activeItem.slug} />
                    ) : null
                  }
                </DragOverlay>

              </div>
            </DndContext>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
