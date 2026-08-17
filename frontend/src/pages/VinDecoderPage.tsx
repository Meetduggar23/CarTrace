import { useNavigate } from "react-router-dom";
import { FileSearch } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchForm } from "@/components/search/SearchForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EXAMPLE_VINS } from "@/lib/constants";
import { detectLookupType } from "@/lib/validation";
import { normalizeQuery } from "@/lib/utils";

export function VinDecoderPage() {
  const navigate = useNavigate();

  function open(vin: string) {
    if (detectLookupType(vin) === "vin") {
      navigate(`/vehicle/vin/${normalizeQuery(vin)}`);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="VIN Decoder"
        description="Decode a 17-character vehicle identification number (VIN) into manufacturer, model, year and specifications."
        path="/vin-decoder"
      />
      <PageHeader
        title="VIN Decoder"
        description="Decode a 17-character VIN into manufacturer, model, year and specification data. Powered by the free NHTSA vPIC database for US/Canada market vehicles."
      />

      <div className="mt-8">
        <SearchForm initialMode="vin" autoFocus />
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <FileSearch className="h-5 w-5 text-primary" aria-hidden />
            <h2 className="mt-3 font-display text-base font-semibold">What a VIN tells you</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Manufacturer and model</li>
              <li>• Model year and trim</li>
              <li>• Engine, fuel and body type</li>
              <li>• Plant / assembly location</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h2 className="font-display text-base font-semibold">Try a sample VIN</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              With the NHTSA provider, US/Canada market VINs decode to real
              manufacturer data. In development mock mode any valid-format VIN
              decodes to clearly-labeled sample data.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {EXAMPLE_VINS.map((vin) => (
                <Button
                  key={vin}
                  variant="outline"
                  size="sm"
                  onClick={() => open(vin)}
                  className="font-mono text-xs"
                >
                  {vin}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
