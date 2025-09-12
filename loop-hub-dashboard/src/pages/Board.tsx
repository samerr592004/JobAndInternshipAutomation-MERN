import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Building2, MapPin, Clock, DollarSign } from "lucide-react";

const initialColumns = {
  applied: {
    id: "applied",
    title: "Applied",
    items: [
      {
        id: "1",
        company: "TechCorp Inc",
        position: "Senior Frontend Developer",
        location: "San Francisco, CA",
        salary: "$120k - $150k",
        appliedDate: "2024-01-20",
        status: "applied"
      },
      {
        id: "2", 
        company: "StartupXYZ",
        position: "React Developer",
        location: "Remote",
        salary: "$100k - $130k",
        appliedDate: "2024-01-18",
        status: "applied"
      }
    ]
  },
  screening: {
    id: "screening",
    title: "Screening",
    items: [
      {
        id: "3",
        company: "MegaCorp",
        position: "Full Stack Engineer",
        location: "New York, NY",
        salary: "$130k - $160k",
        appliedDate: "2024-01-15",
        status: "screening"
      }
    ]
  },
  interview: {
    id: "interview",
    title: "Interview",
    items: [
      {
        id: "4",
        company: "InnovateTech",
        position: "Lead Developer",
        location: "Austin, TX",
        salary: "$140k - $170k",
        appliedDate: "2024-01-10",
        status: "interview"
      }
    ]
  },
  offer: {
    id: "offer",
    title: "Offer",
    items: []
  },
  rejected: {
    id: "rejected", 
    title: "Rejected",
    items: [
      {
        id: "5",
        company: "BigTech Co",
        position: "Software Engineer",
        location: "Seattle, WA",
        salary: "$150k - $180k",
        appliedDate: "2024-01-05",
        status: "rejected"
      }
    ]
  }
};

export default function Board() {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId as keyof typeof columns];
      const destColumn = columns[destination.droppableId as keyof typeof columns];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      
      removed.status = destination.droppableId;
      destItems.splice(destination.index, 0, removed);
      
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId as keyof typeof columns];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied": return "bg-blue-100 text-blue-800";
      case "screening": return "bg-yellow-100 text-yellow-800";
      case "interview": return "bg-purple-100 text-purple-800";
      case "offer": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Application Board</h1>
        <p className="text-muted-foreground">Track your job applications through the hiring process</p>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 min-h-[700px]">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm uppercase tracking-wide">
                  {column.title}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {column.items.length}
                </Badge>
              </div>
              
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-3 min-h-[600px] ${
                      snapshot.isDraggingOver ? "bg-muted/50" : ""
                    } rounded-lg p-2 transition-colors`}
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-card border-border cursor-move ${
                              snapshot.isDragging ? "shadow-lg" : ""
                            }`}
                          >
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-sm font-medium leading-tight">
                                    {item.position}
                                  </CardTitle>
                                  <CardDescription className="flex items-center mt-1">
                                    <Building2 className="w-3 h-3 mr-1" />
                                    {item.company}
                                  </CardDescription>
                                </div>
                                <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                                  {item.status}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0 space-y-2">
                              <div className="flex items-center text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3 mr-1" />
                                {item.location}
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <DollarSign className="w-3 h-3 mr-1" />
                                {item.salary}
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="w-3 h-3 mr-1" />
                                Applied {item.appliedDate}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}