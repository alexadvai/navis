import {AppHeader} from '@/components/layout/header';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';
import {Upload} from 'lucide-react';
import type {Document} from '@/lib/types';

const documents: Document[] = [
  {id: 'DOC001', name: 'Bill of Lading - V001.pdf', type: 'PDF', uploadDate: '2024-08-01', tags: ['B/L', 'V001', 'Active'], size: '1.2 MB'},
  {id: 'DOC002', name: 'Charter Party - V003.docx', type: 'Word', uploadDate: '2024-07-30', tags: ['C/P', 'V003', 'Pending'], size: '450 KB'},
  {id: 'DOC003', name: 'NOR - V005.eml', type: 'Email', uploadDate: '2024-07-20', tags: ['NOR', 'V005', 'Completed'], size: '50 KB'},
  {id: 'DOC004', name: 'SOF - V005.xlsx', type: 'Excel', uploadDate: '2024-07-22', tags: ['SOF', 'V005', 'Completed'], size: '890 KB'},
  {id: 'DOC005', name: 'Final Invoice - V005.pdf', type: 'PDF', uploadDate: '2024-07-28', tags: ['Invoice', 'V005', 'Completed'], size: '300 KB'},
];

export default function DocumentVaultPage() {
  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Document Vault" />
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>All Documents</CardTitle>
              <CardDescription>Search, view, and manage all your voyage-related documents.</CardDescription>
            </div>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead className="hidden sm:table-cell">Size</TableHead>
                  <TableHead>AI-Generated Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map(doc => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{doc.type}</TableCell>
                    <TableCell>{doc.uploadDate}</TableCell>
                    <TableCell className="hidden sm:table-cell">{doc.size}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map(tag => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
