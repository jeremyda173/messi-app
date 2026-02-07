"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Calendar,
  Heart,
  User,
  Trophy,
} from "lucide-react";
import type { FamilyMember } from "@/lib/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FamilyTreeProps {
  family: FamilyMember[];
  onEdit: (person: FamilyMember) => void;
  onDelete: (personId: string) => void;
}

export function FamilyTree({ family, onEdit, onDelete }: FamilyTreeProps) {
  const messi = family.find((person) => person.relationship === "Yo");
  const spouse = family.find((person) => person.relationship === "Esposa");
  const children = family
    .filter(
      (person) =>
        person.relationship === "Hijo" || person.relationship === "Hija",
    )
    .sort((a, b) => a.birthDate.localeCompare(b.birthDate));
  const parents = family.filter(
    (person) =>
      person.relationship === "Padre" || person.relationship === "Madre",
  );
  const siblings = family.filter(
    (person) =>
      person.relationship === "Hermano" || person.relationship === "Hermana",
  );

  // Group others properly could be extended, but for now we keep them separate or integrate if needed.
  // For the "Creative" tree, we'll focus on the direct lineage view which is most requested.
  // We can add a "View All" section for others.
  const others = family.filter(
    (person) =>
      ![
        "Yo",
        "Esposa",
        "Hijo",
        "Hija",
        "Padre",
        "Madre",
        "Hermano",
        "Hermana",
      ].includes(person.relationship),
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRelationshipColor = (relationship: string) => {
    const colors: Record<string, string> = {
      Yo: "bg-gradient-to-r from-blue-400 to-cyan-400 text-white border-none shadow-md",
      Esposa:
        "bg-gradient-to-r from-pink-400 to-rose-400 text-white border-none shadow-md",
      Hijo: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      Hija: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 border-pink-200 dark:border-pink-800",
      Padre:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      Madre:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      Hermano:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800",
      Hermana:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    };
    return colors[relationship] || "bg-secondary text-secondary-foreground";
  };

  const TreeNode = ({
    person,
    isMain = false,
    isSpouse = false,
  }: {
    person: FamilyMember;
    isMain?: boolean;
    isSpouse?: boolean;
  }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      className={cn("relative group z-10")}
    >
      <div
        className={cn(
          "absolute -inset-0.5 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500",
          isMain
            ? "bg-gradient-to-r from-cyan-400 to-blue-600"
            : isSpouse
              ? "bg-gradient-to-r from-pink-400 to-rose-600"
              : "bg-gradient-to-r from-gray-400 to-gray-600",
        )}
      ></div>
      <Card
        className={cn(
          "w-64 relative overflow-hidden transition-all duration-300 border-none bg-background/80 backdrop-blur-xl",
          isMain &&
            "ring-2 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]",
          isSpouse &&
            "ring-2 ring-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.3)]",
        )}
      >
        {isMain && (
          <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
            <Trophy className="w-16 h-16" />
          </div>
        )}
        <CardContent className="p-5 flex flex-col items-center text-center space-y-3">
          <div className="relative">
            <div
              className={cn(
                "absolute inset-0 rounded-full blur-md opacity-50",
                getRelationshipColor(person.relationship).split(" ")[0], // Take the bg class for glow
              )}
            ></div>
            <Avatar className="h-20 w-20 border-4 border-background shadow-xl relative z-10">
              <AvatarImage
                src={person.photo}
                alt={person.name}
                className="object-cover"
              />
              <AvatarFallback className="text-xl bg-muted">
                {getInitials(person.name)}
              </AvatarFallback>
            </Avatar>
            {isSpouse && (
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md z-20">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              </div>
            )}
          </div>

          <div className="space-y-1 w-full">
            <h3 className="font-bold text-lg truncate" title={person.name}>
              {person.name}
            </h3>
            <Badge
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-full",
                getRelationshipColor(person.relationship),
              )}
            >
              {person.relationship}
            </Badge>
          </div>

          <div className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 w-full pt-2 border-t border-border/50">
            <Calendar className="w-3.5 h-3.5" />
            <span className="truncate">
              {person.birthDate
                ? format(new Date(person.birthDate), "d MMM yyyy", {
                    locale: es,
                  })
                : "N/A"}
            </span>
          </div>

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(person)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                {person.relationship !== "Yo" && (
                  <DropdownMenuItem
                    onClick={() => onDelete(person.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  // Custom connector component
  const Connector = ({
    vertical = false,
    height = 40,
  }: {
    vertical?: boolean;
    height?: number;
  }) => (
    <div
      className={cn(
        "bg-border/60 relative",
        vertical
          ? `w-0.5 mx-auto`
          : "h-0.5 w-full top-1/2 -translate-y-1/2 absolute",
      )}
      style={{ height: vertical ? height : 2 }}
    ></div>
  );

  if (family.length === 0) {
    return (
      <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-muted m-4">
        <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
        <p className="text-muted-foreground mb-4 text-lg">
          Tu historia familiar comienza aquí
        </p>
        <Button onClick={() => {}} variant="outline">
          Agregar primer miembro
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto pb-12 pt-4 px-4 custom-scrollbar">
      <div className="min-w-[800px] flex flex-col items-center space-y-8">
        {/* Level 1: Grandparents / Parents */}
        {parents.length > 0 && (
          <div className="flex flex-col items-center">
            <div className="flex gap-12 relative">
              {/* Connector line between parents if needed, usually just separate cards */}
              {parents.map((parent) => (
                <TreeNode key={parent.id} person={parent} />
              ))}
            </div>
            {/* Vertical line connecting Parents to Messi level */}
            <div className="relative h-12 w-full max-w-[50%] mx-auto">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-border to-blue-400/50"></div>
              {/* Horizontal spread to parents - simplified visual */}
            </div>
          </div>
        )}

        {/* Level 2: Messi & Spouse & Siblings */}
        <div className="flex items-start gap-12 relative z-10">
          {/* Siblings Left */}
          {siblings.length > 0 && (
            <div className="flex gap-6 mt-4 opacity-90 scale-90 origin-top-right hidden xl:flex">
              {siblings
                .slice(0, Math.ceil(siblings.length / 2))
                .map((sibling) => (
                  <TreeNode key={sibling.id} person={sibling} />
                ))}
            </div>
          )}

          {/* Main Couple */}
          <div className="flex items-center gap-1">
            <div className="relative">
              {messi && <TreeNode person={messi} isMain />}
            </div>

            {spouse && (
              <div className="flex flex-col items-center px-4 self-center">
                <div className="h-0.5 w-16 bg-gradient-to-r from-blue-400 to-pink-400 relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-1.5 rounded-full border shadow-sm">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                  </div>
                </div>
              </div>
            )}

            <div className="relative">
              {spouse && <TreeNode person={spouse} isSpouse />}
            </div>
          </div>

          {/* Siblings Right */}
          {siblings.length > 0 && (
            <div className="flex gap-6 mt-4 opacity-90 scale-90 origin-top-left hidden xl:flex">
              {siblings.slice(Math.ceil(siblings.length / 2)).map((sibling) => (
                <TreeNode key={sibling.id} person={sibling} />
              ))}
            </div>
          )}
        </div>

        {/* Level 3: Children */}
        {children.length > 0 && (
          <div className="flex flex-col items-center w-full relative">
            {/* Connection Line from Parents */}
            <div className="h-12 w-0.5 bg-gradient-to-b from-purple-400/50 to-border -mt-8 mb-6 z-0" />

            {/* Horizontal Bar */}
            <div className="relative w-full flex justify-center mb-6">
              <div className="absolute top-0 w-[80%] max-w-2xl border-t-2 border-border/60 rounded-full h-4"></div>
              {/* Vertical drops for each child handled by their alignment or individual lines? 
                    Let's just use the flex gap and individual short vertical lines on top of the cards if we want strictly standard tree look.
                    For "Modern", floating them is fine.
                */}
            </div>

            <div className="flex gap-8 items-start flex-wrap justify-center">
              {children.map((child, i) => (
                <div
                  key={child.id}
                  className="flex flex-col items-center relative"
                >
                  <div className="h-6 w-0.5 bg-border/60 absolute -top-12"></div>
                  <TreeNode person={child} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Relatives Standalone */}
        {/* Other Relatives Standalone */}
        <div className={cn("pt-12 border-t w-full", (others.length === 0 && siblings.length === 0) ? "hidden" : "")}>
            {(others.length > 0 || siblings.length > 0) && (
              <>
                 <h3 className="text-xl font-bold text-center mb-8 text-muted-foreground/60 tracking-widest uppercase text-sm">Familia Extendida</h3>
                 <div className="flex flex-wrap gap-6 justify-center">
                    {/* Show siblings here ONLY on smaller screens */}
                    <div className="xl:hidden flex flex-wrap gap-6 justify-center w-full mb-6">
                       {siblings.map(sibling => <TreeNode key={`mobile-${sibling.id}`} person={sibling} />)}
                    </div>
                    {others.map(person => <TreeNode key={person.id} person={person} />)}
                 </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
}
