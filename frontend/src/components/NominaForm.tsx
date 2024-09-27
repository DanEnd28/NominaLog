import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Input, Button, Autocomplete, AutocompleteItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

interface NominaData {
  fecha: string;
  recibo: string;
  moneda: string;
  monto: number;
  nombre: string;
  montoEnLetras: string;
  concepto: string;
  numeroFactura: string;
}

const NominaForm: React.FC = () => {
  const [formData, setFormData] = useState<NominaData>({
    fecha: '',
    recibo: '',
    moneda: 'Bs',
    monto: 0,
    nombre: '',
    montoEnLetras: '',
    concepto: '',
    numeroFactura: ''
  });

  const [searchResults, setSearchResults] = useState<NominaData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/nomina`, formData);
      console.log('Respuesta:', response.data);
      // Aquí puedes manejar la respuesta, por ejemplo, mostrando un mensaje de éxito
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error
    }
  };

  const handleSearch = async (value: string) => {
    if (value.length > 2) {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/nomina/search?q=${value}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error al buscar:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Fecha"
              name="fecha"
              type="date"
              value={formData.fecha}
              onChange={handleInputChange}
            />
            <Input
              label="Recibo"
              name="recibo"
              value={formData.recibo}
              onChange={handleInputChange}
            />
            <Input
              label="Moneda"
              name="moneda"
              value={formData.moneda}
              onChange={handleInputChange}
            />
            <Input
              label="Monto"
              name="monto"
              type="number"
              value={formData.monto.toString()}
              onChange={handleInputChange}
            />
            <Input
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            <Input
              label="Monto en Letras"
              name="montoEnLetras"
              value={formData.montoEnLetras}
              onChange={handleInputChange}
            />
            <Input
              label="Concepto"
              name="concepto"
              value={formData.concepto}
              onChange={handleInputChange}
            />
            <Input
              label="Número de Factura"
              name="numeroFactura"
              value={formData.numeroFactura}
              onChange={handleInputChange}
            />
            <Button color="primary" type="submit">
              Enviar
            </Button>
          </form>
        </CardBody>
      </Card>

      <Card className="mb-8">
        <CardBody>
          <Autocomplete
            label="Buscar Nómina"
            onInputChange={handleSearch}
            isLoading={isLoading}
          >
            {searchResults.map((item) => (
              <AutocompleteItem key={item.recibo} value={item.recibo}>
                {item.nombre} - {item.recibo}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Table aria-label="Resultados de búsqueda">
            <TableHeader>
              <TableColumn>Recibo</TableColumn>
              <TableColumn>Nombre</TableColumn>
              <TableColumn>Monto</TableColumn>
              <TableColumn>Fecha</TableColumn>
            </TableHeader>
            <TableBody>
              {searchResults.map((item) => (
                <TableRow key={item.recibo}>
                  <TableCell>{item.recibo}</TableCell>
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell>{item.monto}</TableCell>
                  <TableCell>{item.fecha}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default NominaForm;